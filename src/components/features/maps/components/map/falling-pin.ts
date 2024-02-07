import { StyleImageInterface } from 'maplibre-gl'

export function createFallingPin(map: any): StyleImageInterface {
    const pinImage = new Image()
    pinImage.src = 'images/pin-blue.svg'

    return {
        width: 27,
        height: 41,
        data: new Uint8Array(27 * 41 * 4),

        // When the layer is added to the map,
        // get the rendering context for the map canvas.
        onAdd: function () {
            const canvas = document.createElement('canvas')
            canvas.width = this.width
            canvas.height = this.height
            // @ts-ignore
            this.context = canvas.getContext('2d')
        },

        // Call once before every frame where the icon will be used.
        render: function (this: any) {
            // Draw the pin image onto the canvas.
            this.context.drawImage(pinImage, 0, 0, this.width, this.height)

            // Update this image's data with data from the canvas.
            this.data = this.context.getImageData(0, 0, this.width, this.height).data

            // Continuously repaint the map, resulting
            // in the smooth animation of the pin.
            map.triggerRepaint()

            // Return `true` to let the map know that the image was updated.
            return true
        },
    }
}
