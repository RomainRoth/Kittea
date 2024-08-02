<template>
    <gdiWindow>
        <div class="flex flex-col w-full h-full pt-8 pb-2 px-3">
            <div>
                <input type="text" class="border w-full px-2" value="/" ref="uriInput" @keydown="_uriKeydown($event)" />
            </div>
            <div class="gdiToolbar">
                &nbsp;
                <button class="gdiToolbarButton" v-tooltip="'up'">
                    <Icon name="mdi:arrow-up-bold"  class="text-2xl text-white" />
                </button>
                &nbsp;&nbsp;
                <button class="gdiToolbarButton" v-tooltip="'rename'">
                    <Icon name="mdi:form-textbox"  class="text-xl mt-0.5 ml-0 text-white" />
                </button>
                <button class="gdiToolbarButton" v-tooltip="'delete'">
                    <Icon name="mdi:skull"  class="text-2xl mt-0 ml-0 rotate-12 text-white" />
                </button>
                &nbsp;&nbsp;
                <button class="gdiToolbarButton" v-tooltip="'new file'">
                    <Icon name="mdi:file"  class="text-3xl mt-1.5 ml-2 -rotate-12 text-white" />
                </button>
                <button class="gdiToolbarButton" v-tooltip="'new folder'">
                    <Icon name="mdi:folder-open"  class="text-3xl mt-1.5 ml-2 -rotate-12 text-white" />
                </button>
                &nbsp;
            </div>
            <div class="flex flex-grow overflow-hidden">
                <div class="border-r w-40">...</div>
                <div class="flex-grow overflow-scroll">
                    <template v-for="(directoryItem, index) in directoryItems ?? []" :key="index">
                        <div class="flex gap-1 items-center px-1" @dblclick="_itemDblClick($event, directoryItem)" draggable="true">
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
        mounted() {
            this._ls('/');
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
    .gdiToolbar {
        background: 
            repeating-linear-gradient(
                0deg,
                transparent,
                transparent 4px,
                #eee 4px,
                #eee 6px
            );
        @apply h-7 shrink-0 flex gap-1;
    }
    .gdiToolbarButton {
        box-shadow: 1px 1px 3px 1px rgba(56, 159, 227, 0.7);
        background: radial-gradient(farthest-corner at 30% 30%, #389fe3aa, #38a0e3) white;
        @apply rounded-full h-7 w-7 relative flex items-center justify-center shrink-0 overflow-clip;
    }

    .gdiToolbarButton:hover {
        background: radial-gradient(farthest-corner at 30% 30%, #2cddb5aa, #2cddb5) white;
    }

    .gdiToolbarButton::before {
        content: "";
        @apply absolute h-7 w-7 ring-1 ring-inset ring-white rounded-full inset-0;
    }

    .gdiToolbarButton > span {
        @apply absolute block opacity-90 pointer-events-none;
    }

    .gdiToolbarButton:hover > span {
        @apply opacity-90;
    }
    
    .gdiToolbarButton::after {
        content: "";
        position: absolute;
        border-radius: 100px;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(180deg,rgba(250, 250, 255, 1) 0%,rgba(250, 250, 255, 0.7) 50%,rgba(0, 0, 0, 0) 100%);
        top: -4px;
        left: 0px;
        -moz-transform: scale(0.50, 0.4);
        -webkit-transform: scale(0.50, 0.4);
        opacity: 0.5;
    }

    .gdiToolbarButton::after:hover {
        opacity: 0.2;
    }
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