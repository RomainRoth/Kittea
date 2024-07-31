<template>
    <div class="gdiBadge" :data-type="_type">
        <Icon v-if="_type=='directory'" name="mdi:folder-open" class="text-yellow-500 text-2xl -rotate-12 top-0 ml-2.5" />
        <Icon v-if="_type=='file'" name="mdi:file" class="text-gray-100 text-2xl -rotate-12 top-0 ml-2.5" />
    </div>
</template>

<script lang="ts">
    export default {
        name: 'gdiBadge',
        props: {
            name: {
                type: String,
                default: '...'
            },
            type: {
                type: String,
                default: '...'
            },
        },
        computed: {
            _type() : string {

                switch(this.type)
                {
                    case 'directory':
                        return 'directory'
                    default :
                        const _extension = this._getFileExtension(this.name);
                        switch(_extension)
                        {
                            default:
                                return 'file';
                        }
                }
            }
        },
        methods: {
            _getFileExtension(filename: string): string | null {
                // Check if the filename contains a period
                const dotIndex = filename.lastIndexOf('.');
                if (dotIndex === -1 || dotIndex === filename.length - 1) {
                    // No period or period is the last character
                    return null;
                }
                // Extract and return the extension
                return filename.substring(dotIndex + 1);
            }
        }
    }
</script>

<style scoped>
    .gdiBadge {
        background: radial-gradient(circle, rgba(54,228,213,0.19931722689075626) 0%, rgba(12,168,173,1) 100%);
        box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.1);
        @apply w-9 h-5 rounded-md overflow-clip relative;
    }
    .gdiBadge::after {
        content: '';
        box-shadow: inset 0px 1px 0px 0px rgba(255,255,255,0.5), inset 0px -1px 0px 1px rgba(0,0,0,0.2), 0px -1px 0px 10px rgba(0,0,0,0.2);
        @apply w-full h-full absolute top-0 left-0 rounded-md;
    }
    .gdiBadge * {
        box-shadow: inset 0px 1px 0px 0px rgba(255,255,255,0.5), inset 0px -1px 0px 1px rgba(0,0,0,0.2);
    }
    .gdiBadge[data-type="directory"] {
        @apply bg-gradient-to-br from-yellow-100 to-yellow-400
    }
</style>