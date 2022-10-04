/**
 * Author: DenisovichDev (@DenisovichPy)
 * Made for the wonderful @sableRaph and his community (and the friends and enemies)
 *
 * I have commented it as much as I could. Please read README for more.
 */ 



#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <stdbool.h>
#include <string.h>
#include <unistd.h>

#include "bmp.h"
#include "render.h"
#include "utils.h"

#define TOTAL_FRAMES 33
#define REPEAT_AT 15
#define DELAY 100000


int main() {

    // Setup

	DIBHeader bitmapInfo;
	unsigned char* bitmapData;

    loadBMP("./sequence/s1.bmp", &bitmapInfo);
    int w = bitmapInfo.imgWidth, h = bitmapInfo.imgHeight;
    const unsigned int nPix = w * h; // number of pixels

    color* colBuff[nPix]; 	// Buffer of color data


    int imgNum = 1;
    uint32_t frameCount = 0;
    bool running = true;

    system("clear");

    // Draw
    while (running) {

        // printf("\x1b[2J"); // Slightly jittery 
        printf("\x1b[H");
        /* printf("\x1b[23A"); */

        char fileName[20];
        snprintf(fileName, 20, "./sequence/s%d.bmp", imgNum); // second arg is the max size

        bitmapData = loadBMP(fileName, &bitmapInfo);

        getBufferArray(bitmapData, bitmapInfo.imageSizeBytes, nPix, colBuff, &bitmapInfo, frameCount); // Omit the bitmapInfo.size

        char output[nPix];
        loadASCIIBuffer(colBuff, nPix, output);

        plotImage(output, w, h);

        imgNum = imgNum < TOTAL_FRAMES ? imgNum + 1 : REPEAT_AT;

        usleep(DELAY);

        // Free the pointers
        free(bitmapData);

        frameCount++;

    }

	return 0;
}
