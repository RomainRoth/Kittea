<template>
    <div class="gdiWindow fixed" :style="{ top: `${windowY}px`, left: `${windowX}px`, width: `${windowWidth}px`, height: `${windowHeight}px` }">
        <div class="relative w-full h-full"> 
            <div class="absolute h-8 left-0 top-0 right-0 select-none titlebar rounded-md flex items-center gap-1">
                <div class="flex-grow mt-2 pl-3" @mousedown="_beginHandleMouseAction($event, 'm')">Title</div>
                <button class="gdiMarble mt-2" v-tooltip="'Minimize'"></button>
                <button class="gdiMarble mt-2" v-tooltip="'Maximize'"></button>
                <button class="gdiMarble mt-2 mr-3" v-tooltip="'Close'"></button>
            </div>
            <div class="absolute w-0.5 h-full cursor-ew-resize" @mousedown="_beginHandleMouseAction($event, 'w')"></div>
            <div class="absolute h-0.5 left-0 right-0 cursor-ns-resize select-none" @mousedown="_beginHandleMouseAction($event, 'n')" ></div>
            <div class="absolute w-0.5 h-full right-0 cursor-ew-resize select-none" @mousedown="_beginHandleMouseAction($event, 'e')"></div>
            <div class="absolute h-0.5 bottom-0 w-full cursor-ns-resize select-none" @mousedown="_beginHandleMouseAction($event, 's')"></div>
            <div class="absolute w-2 h-2 cursor-nwse-resize select-none" @mousedown="_beginHandleMouseAction($event, 'nw')"></div>
            <div class="absolute w-2 h-2 right-0 cursor-nesw-resize select-none" @mousedown="_beginHandleMouseAction($event, 'ne')" ></div>
            <div class="absolute w-2 h-2 right-0 bottom-0 cursor-nwse-resize select-none" @mousedown="_beginHandleMouseAction($event, 'se')"></div>
            <div class="absolute w-2 h-2 bottom-0 cursor-nesw-resize select-none" @mousedown="_beginHandleMouseAction($event, 'sw')"></div>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'gdiWindow',
        data() {
            return {
                windowX: 0,
                windowY: 0,
                windowWidth: 0,
                windowHeight: 0,
                startX: 0,
                startY: 0,
                startWidth: 0,
                startHeight: 0,
                currentHandle: ''
            }
        },
        props: {
            title: {
                type: String,
                default: '...' 
            },
            top: {
                type: Number,
                default: 10
            },
            left: {
                type: Number,
                default: 10
            },
            width: {
                type: Number,
                default: 640
            },
            height: {
                type: Number,
                default: 480
            }
        },
        mounted() {
            this.windowX = this.left;
            this.windowY = this.top;
            this.windowWidth = this.width;
            this.windowHeight = this.height;
        },
        methods: {
            _beginHandleMouseAction(event: MouseEvent, handle: string) {
                this.startX = event.clientX;
                this.startY = event.clientY;
                this.startWidth = this.windowWidth;
                this.startHeight = this.windowHeight;
                this.currentHandle = handle;
                event.stopPropagation();
                document.addEventListener('mousemove', this._updateHandleMouseAction);
                document.addEventListener('mouseup', this._endHandleMouseAction);
            },
            _updateHandleMouseAction(event: MouseEvent) {
                const dx = event.clientX - this.startX;
                const dy = event.clientY - this.startY;
                this.startX = event.clientX;
                this.startY = event.clientY;

                if(this.currentHandle == 'w' || this.currentHandle == 'nw' || this.currentHandle == 'sw') {
                    this.windowX += dx;
                    this.windowWidth -= dx;
                };
                if(this.currentHandle == 'e' || this.currentHandle == 'ne' || this.currentHandle == 'se') {
                    this.windowWidth += dx;
                }
                if(this.currentHandle == 'n' || this.currentHandle == 'nw' || this.currentHandle == 'ne') {
                    this.windowY += dy;
                    this.windowHeight -= dy;
                }
                if(this.currentHandle == 's' || this.currentHandle == 'sw' || this.currentHandle == 'se') {
                    this.windowHeight += dy;
                }
                if(this.currentHandle == 'm') {
                    this.windowX += dx;
                    this.windowY += dy;
                }
            },
            _endHandleMouseAction() {
                document.removeEventListener('mousemove', this._updateHandleMouseAction);
                document.removeEventListener('mouseup', this._endHandleMouseAction);
            }
        }
    }
</script>

<style scoped>
    .gdiWindow {
        box-shadow: inset 0px 0px 0px 3px #FFFFFF, inset 0px 0px 6px 6px rgba(100,100,200,0.08);
        @apply bg-white border-2 rounded-xl;
    }
    .gdiMarble {
        background: radial-gradient(farthest-corner at 80% 80%, rgba(176,238,245,1), rgba(134,197,221,1));
        @apply rounded-full h-4 w-4 relative hover:animate-pulse flex items-center justify-center shrink-0;
    }
    .gdiMarble:hover {
        background: radial-gradient(farthest-corner at 80% 80%, #cafff6, #2cddb5);
    }

    .gdiMarble > span {
        @apply block;
    }
    
    .gdiMarble::after {
        content: "";
        background-image: linear-gradient(180deg,rgba(250, 250, 255, 1) 0%,rgba(250, 250, 255, 0.7) 50%,rgba(0, 0, 0, 0) 100%);
        -moz-transform: scale(0.50, 0.4);
        -webkit-transform: scale(0.50, 0.4);
        @apply absolute rounded-full w-full h-full -top-1 left-0;
    }
</style>