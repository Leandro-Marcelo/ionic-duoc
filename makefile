build:
	rm -rf dist
	rm -rf ios
	rm -rf android
	ionic build
	ionic cap add ios
	ionic cap add android

open: build
	ionic cap open ios
	ionic cap open android

run: open
	ionic serve --port 3000

run-dev:
	ionic serve --port 3000
