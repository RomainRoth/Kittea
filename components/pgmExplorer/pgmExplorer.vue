<template>
    <gdiWindow>
        <div class="flex flex-col w-full h-full pt-8 pb-2 px-3">
            <div>
                <input type="text" class="border w-full px-2" value="/" ref="uriInput" @keydown="_uriKeydown($event)" />
            </div>
            <div class="flex flex-grow overflow-hidden">
                <div class="border-r w-40">...</div>
                <div class="flex-grow overflow-scroll">
                    <template v-for="(directoryItem, index) in directoryItems ?? []" :key="index">
                        <div class="flex gap-1 items-center px-1" @dblclick="_itemDblClick($event, directoryItem)">
                            <div>
                                <gdiBadge :type="directoryItem.type" :name="directoryItem.name" />
                            </div>
                            <div>
                                {{ directoryItem.name }}
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="border-t text-xs">
                <template v-if="directoryItems.length > 1">
                    {{ t('itemsCount', { count: directoryItems.length }) }}
                </template>
                <template v-else>
                    {{ t('itemCount', { count: directoryItems.length }) }}
                </template>
            </div>
        </div>
    </gdiWindow>
</template>

<script lang="ts">
    import gdiWindow from '../gdiWindow/gdiWindow.vue';
    import gdiBadge from '../gdiBadge/gdiBadge.vue';

    import type IDirectoryItem from '~/types/IDirectoryItem';

    export default {
        name: 'pgmExplorer',
        components: {
            gdiWindow,
            gdiBadge
        },
        setup() {
            const { t } = useI18n({
                useScope: 'local'
            });
            return { t };
        },
        data() {
            return {
                currentPath: '/',
                privateDirectoryItems: [] as IDirectoryItem[] | null
            }
        },
        computed: {
            directoryItems() : IDirectoryItem[] {
                return this.privateDirectoryItems ?? [];
            }
        },
        methods: {
            async _uriKeydown(event: KeyboardEvent) {
                if(event.key == 'Enter') {
                    await this._ls((this.$refs.uriInput as HTMLInputElement).value);
                }
            },
            async _itemDblClick(event: MouseEvent, _item: IDirectoryItem) {
                if(_item.type=='directory') {
                    await this._ls(this.currentPath + _item.name + '/');
                }
            },
            async _ls(_path : string) {
                try{
                    this.privateDirectoryItems = await $fetch('/api/ls', {
                        method: 'POST',
                        body: JSON.stringify({ path: _path }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    this.currentPath = _path;
                    (this.$refs.uriInput as HTMLInputElement).value = this.currentPath;
                }catch(ex)
                {
                    console.log(ex);
                }
            }
        }
    }
</script>

<style scoped>

</style>

<i18n lang="yaml">
    {
        en: {
            itemCount: '{count} item',
            itemsCount: '{count} items',
            selectedItemCount: '{count} selected item',
            selectedItemsCount: '{count} selected items'
        },
        fr: {
            itemCount: '{count} element',
            itemsCoount: '{count} elements',
            selectedItemCount: '{count} élément sélectionné',
            selectItemsCount: '{count} éléments sélectionnés'
        }
    }
</i18n>