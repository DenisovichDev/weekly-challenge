/**
 * Author: DenisovichDev (@DenisovichPy)
 * Made for the wonderful @sableRaph and his community (and the friends and enemies)
 *
 * I have commented it as much as I could. Please read README for more.
 */ 

#include <stdio.h>

#include "utils.h"
#include "bmp.h"

int idxIn1D(int x, int y, int width) {
	return (y * width + x);
}

void printArray (unsigned char* imageData, uint32_t size, DIBHeader* bitmapInfo) {
	int increment = bitmapInfo->bitsPerPixel / 8;
	for (int i = 0; i < size; i += increment) {
		printf("[%d ", imageData[i    ]);
		printf("%d ",  imageData[i + 1]);
		printf("%d]",  imageData[i + 2]);
	}
}

void printCol (color** buffer, int width, int height) {
	for (int j = 0; j < height; j++) {
		for (int i = 0; i < width; i++) {
			int idx = j * width + i;
			color* col = buffer[idx];
			/* printf("%d %d %d|", col->r, col->g, col->b); */
			printf(" %d ", col->grey);
		}
		printf("\n");
	}
}

