#include <stdio.h>
#include <string.h>
#include <stdlib.h>


/*
  THIS SCRIPT IS STILL UNDER MAINTENANCE
*/


int main() {
    int o = 0x100; // 0xff=255, 0x100=256
    char ip[0xf]; // 0xf=15 max ip length with.

    printf("; ");
    scanf("%s", ip);

    char *ptr = strtok(ip, "."); // ptr=pointer

    // octet numbers [0x1000000=16777216 (o*(o*o))], [0x10000=65536 (o*o)], [0x100=256 (o)]
    int ONs[] = {o*(o*o), o*o, o};

    int cio = 0; // cio=current ip octet (counter for math equation)
    int total = 0;

    if (ip) {
        while (ptr != NULL) {
            total += ONs[cio] * atoi(ptr);

            ptr = strtok(NULL, "."); // ??

            cio += 1;
        }
        printf("%d", total);
    }
    return 0;
}
