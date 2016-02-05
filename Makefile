angular:
	rm -rf styles partials index.html script.js
	mv web/angular/dist/* .

react:
	rm -rf styles fonts
	cp -rf web/react/dist/* .

