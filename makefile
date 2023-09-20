build:
	rm -rf www
	rm -rf ios
	rm -rf android
	ionic build
	ionic cap add ios
	ionic cap add android

open: build
	ionic cap open ios
	ionic cap open android

start: open
	ionic serve --port 3000

start-dev:
	ionic serve --port 3000
