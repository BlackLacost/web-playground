include .env
project_name = $(notdir ${path})
site_name = ${PREFIX}-${project_name}

create:
	heroku apps:create ${site_name} --region eu
	heroku buildpacks:add https://github.com/timanovsky/subdir-heroku-buildpack \
		--app=${site_name}
	heroku config:set PROJECT_PATH=${path} --app=${site_name}
	heroku git:remote --app ${site_name} --remote=${project_name}

destroy:
	heroku apps:destroy ${site_name} --confirm=${site_name}

buildpacks-nodejs:
	heroku buildpacks:add heroku/nodejs --app=${site_name}

buildpacks-static:
	heroku buildpacks:add heroku-community/static --app=${site_name}

push:
	git push ${project_name} main

open:
	heroku open --app=${site_name}

node: create buildpacks-nodejs push open
renode: destroy node
static: create buildpacks-static push open
restatic: destroy static

echo:
	echo $(dir ${dir})
	echo $(notdir ${dir})


