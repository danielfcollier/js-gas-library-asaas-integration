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
	@diff -ru ${SRC} ${DEPLOY} --suppress-common-lines || exit 0

deployments:
	@clasp deployments

update-versions:
	@clasp deployments | egrep -i '@[0-9]' | awk '{print substr($$3, 2, 1)}'

update-deploy:
	@rm -rf ${DEPLOY}
	@cp -r src ${DEPLOY}

bundle:
	@rm -rf ${BUNDLE}
	@-mkdir -p ${BUNDLE}
	@find ${SRC} -type f -not -path "**/tests/*" -not -path "**/test/*" -not -iname "**deps.js"| xargs cat > ${BUNDLE}"/main.js"
	@cat ${BUNDLE}"/main.js" | grep ^function | awk 'BEGIN {print "module.exports = {"} {split($$2, functionName, "("); print "  "functionName[1]","} END {print "}" }' >> ${BUNDLE}"/main.js"

test:
	node test.js
