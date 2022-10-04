/**
 * Author: DenisovichDev (@DenisovichPy)
 * Made for the wonderful @sableRaph and his community (and the friends and enemies)
 *
 * I have commented it as much as I could. Please read README for more.
 */ 

#include <stdint.h>
#include <stdlib.h>
#include <stdio.h>
#include <math.h>

#include "bmp.h"
#include "render.h"

void getBufferArray(unsigned char* imageData, uint32_t size, const unsigned int bSize, color* buffer[bSize], DIBHeader* bitmapInfo, uint32_t frc) {
	int counter = 0;
	int increment = bitmapInfo->bitsPerPixel / 8;
	for (int i = 0; i < size; i += increment) {
		int r = imageData[i    ];
		int g = imageData[i + 1];
		int b = imageData[i + 2];
		int greyVal = ((float)r + (float)g + (float)b) / 3;


		color* col = (color*) malloc(sizeof(color));
		col->r = r; col->g = g; col->b = b; col->grey = greyVal;

        // Free the memory from the previous cycle before you lose 
        // access to the memory location
        if (frc > 0) free(buffer[counter]);

		buffer[counter] = col;

        /* free(col); */

		counter++;
	}
}

void loadASCIIBuffer(color** buffer, const unsigned int bSize, char symBuffer[bSize]) {
	for (int i = 0; i < bSize; i++) {
		color* pixel = buffer[i];
		float val = (float) pixel->grey;

		int lumIndex = round((val / 255.0) * 12.0); // Scale the brightness value

		symBuffer[i] = " .,-~:;=!*#$@"[lumIndex]; // Put the correct character in the output buffer
	}
}

void plotImage(char* symBuffer, int width, int height) {
	for (int j = 0; j < height; j++) {
		for (int i = 0; i < width; i++) {
			int idx = j * width + i;
			putchar(symBuffer[idx]);
		}
		putchar('\n');
	}
}

void render() {

}

