define release
	VERSION=`node -pe "require('./package.json').version"` && \
	NEXT_VERSION=`node -pe "require('semver').inc(\"$$VERSION\", '$(1)')"` && \
	node -e "\
	var j = require('./package.json');\
	j.version = \"$$NEXT_VERSION\";\
	var s = JSON.stringify(j, null, 2);\
	require('fs').writeFileSync('./package.json', s);" && \
	node server.js compile && \
	git add -- www && \
	git commit -m "v$$NEXT_VERSION" -- package.json www && \
	git tag "$$NEXT_VERSION" -m "v$$NEXT_VERSION"
endef

compile:
	@node server.js compile

release-patch:
	@$(call release,patch)

release-minor:
	@$(call release,minor)

release-major:
	@$(call release,major)

test:
	@npm test

publish:
	git push --tags origin HEAD:master
	git push heroku master