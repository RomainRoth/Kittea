<template>
    <GdiWindow>
        <div class="flex flex-col w-full h-full pt-8 px-3">
            <div>
                <input type="text" class="border w-full px-2" value="/" @keydown="_uriKeydown($event)" />
            </div>
            <div class="flex flex-grow overflow-hidden">
                <div class="border-r w-40">...</div>
                <div class="flex-grow overflow-scroll">
                    <template v-for="(directoryItem, index) in directoryItems ?? []" :key="index">
                        <div>
                            {{ directoryItem.name }}
                        </div>
                    </template>
                </div>
            </div>
            <div class="border-t">
                // TODO : Status bar here
            </div>
        </div>
    </GdiWindow>
</template>

<script lang="ts">
    import gdiWindow from '../gdiWindow/gdiWindow.vue';

    import type IDirectoryItem from '~/types/IDirectoryItem';

    export default {
        name: 'pgmExplorer',
        components: {
            gdiWindow
        },
        data() {
            return {
                directoryItems: [] as IDirectoryItem[] | null
            }
        },
        methods: {
            async _uriKeydown(event: KeyboardEvent) {
                if(event.key == 'Enter') {
                    await this._ls('/');
                }
            },
            async _ls(_path : string) {
                try{
                    this.directoryItems = await $fetch('/api/ls', {
                        method: 'POST',
                        body: JSON.stringify({ path: _path }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
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