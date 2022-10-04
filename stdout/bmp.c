/**
 * Author: DenisovichDev (@DenisovichPy)
 * Made for the wonderful @sableRaph and his community (and the friends and enemies)
 *
 * I have commented it as much as I could. Please read README for more.
 */ 

#include <stdint.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#include "bmp.h"

unsigned char* loadBMP(char *filename, DIBHeader *DIBitmapHeader) {
    FILE *filePtr;  
    BMPFileHeader bitmapFileHeader; 
    unsigned char* bitmapImage; 

    // Open the file in read bin mode
    filePtr = fopen(filename,"rb");
    if (filePtr == NULL) {
        return NULL;
	}

    // Read the BMP header into the struct
    fread(&bitmapFileHeader, sizeof(BMPFileHeader), 1, filePtr);

    // Check if this is a BMP file with the signature
    if (bitmapFileHeader.signature !=0x4D42) {
        fclose(filePtr);
        return NULL;
    }

    // Read the DIB header into the struct
    fread(DIBitmapHeader, sizeof(DIBHeader), 1, filePtr);

	if (DIBitmapHeader->imageSizeBytes == 0) { 
		DIBitmapHeader->imageSizeBytes = 
			((DIBitmapHeader->imgHeight * DIBitmapHeader->imgWidth) * DIBitmapHeader->bitsPerPixel) / 8;
	}

    // This shifts the the file position pointer (similar to say, a cursor pointer)
	// to the beginning of the bitmap data. The bitmap data is located after the header
	// (containing all the metadata), which is of 54 bytes. However, this offset is also
	// in the bitmap header, in this case, the defined offset property.
    fseek(filePtr, bitmapFileHeader.offset, SEEK_SET);

    // Allocate memory to save pixel array
    bitmapImage = (unsigned char*) malloc(DIBitmapHeader->imageSizeBytes);

    // Check malloc
    if (!bitmapImage) {
        free(bitmapImage);
        fclose(filePtr);
        return NULL;
    }

    // read in the bitmap image data
    fread(bitmapImage, DIBitmapHeader->imageSizeBytes, 1, filePtr);

    // Check if it worked
    if (bitmapImage == NULL) {
        fclose(filePtr);
        return NULL;
    }
	
    // BGR -> RGB
    unsigned char tempRGB;  //our swap variable
	int increment = DIBitmapHeader->bitsPerPixel / 8;
    for (int imageIdx = 0; imageIdx < DIBitmapHeader->imageSizeBytes; imageIdx += increment) {
        tempRGB = bitmapImage[imageIdx];
        bitmapImage[imageIdx] = bitmapImage[imageIdx + 2];
        bitmapImage[imageIdx + 2] = tempRGB;
    }

    // Reverse the row order
    const int32_t rows = DIBitmapHeader->imgHeight;
    const int32_t cols = DIBitmapHeader->imgWidth;
    for (int j = 0; j < rows / 2 ; j++) {
        for (int i = 0; i < cols; i++) {
            int idxFrom = (j * cols + i) * increment;
            int idxTo = ((rows - j - 1) * cols + i) * increment;
            
            int offset;
            for (offset = 0; offset < increment; offset++) {
                unsigned char temp = bitmapImage[idxFrom + offset];
                bitmapImage[idxFrom + offset] = bitmapImage[idxTo + offset];
                bitmapImage[idxTo + offset] = temp;

            }
            
        }
    }

    fclose(filePtr);
    return bitmapImage;
}

