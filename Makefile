angular:
	rm -rf styles partials index.html script.js
	mv client/angular/dist/* .

react:
	rm -rf styles fonts
	cp -rf client/react_redux/dist/* .

