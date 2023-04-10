app=i2n

${app}: ${app}.o
	gcc ${app}.c -o ${app}

clean:
	rm *.o ${app}
