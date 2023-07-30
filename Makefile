DEPLOY = ".deploy"
NODE = ".node_modules"
SRC = "src"
BUNDLE = ".bundle"

install:
	@npm install

clean:
	@rm -rf ${DEPLOY}
	@rm -rf ${NODE}

update-clasp-json:
	@jq '.rootDir="${PWD}/.deploy"' .clasp.json > .tmp.clasp.json
	@cat .tmp.clasp.json > .clasp.json
	@rm .tmp.clasp.json

push:
	@clasp push
	@git push

pull: update-clasp-json
	@mkdir -p ${DEPLOY}
	@-rm -rf ${DEPLOY}
	@clasp pull
	@git pull

diff:
	@diff -ru ${DEPLOY} ${SRC} --suppress-common-lines || exit 0

deployments:
	@clasp deployments

update-version:
	VERSION:=$(shell clasp deployments | egrep -i '@[0-9]' | awk '{print substr($$3, 2, 1)}')
	@cat README.md |  awk -v version=${VERSION} '{ if (match($$0, "version")) { sub(/"[0-9]"/, "\""version"\"", $$0); print $$0; } else {print $$0;}}' > .tmp.README.md
	@cat .tmp.README.md > README.md
	@rm .tmp.README.md

update-deploy:
	@rm -rf ${DEPLOY}
	@cp -r src ${DEPLOY}

bundle:
	@rm -rf ${BUNDLE}
	@-mkdir -p ${BUNDLE}
	@find ${SRC} -type f -not -path "**/tests/*" -not -path "**/test/*" -not -iname "**deps.js"| xargs cat > ${BUNDLE}"/main.js"
	@cat ${BUNDLE}"/main.js" | grep ^function | awk 'BEGIN {print "module.exports = {"} {split($$2, functionName, "("); print "  "functionName[1]","} END {print "}" }' >> ${BUNDLE}"/main.js"

lint:
	@npx prettier ${SRC} --write
	@npx eslint --fix --quiet ${SRC}

update-test: lint bundle
	@-npm test
