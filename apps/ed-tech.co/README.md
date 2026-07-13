# edtech

## How to update this codebase from upstream (goldlabelapps/nx)

1. View your current remotes:
	```sh
	git remote -v
	```

2. Add the upstream remote if it is not already set:
	```sh
	git remote add upstream https://github.com/goldlabelapps/nx.git
	```

3. Fetch the latest changes from upstream:
	```sh
	git fetch upstream
	```

4. Merge or rebase the upstream branch (usually main) into your local branch:
	```sh
	git merge upstream/master
	# or
	git rebase upstream/master
	```

5. Push your updated branch to your origin if needed:
	```sh
	git push origin <your-branch-name>
	```
