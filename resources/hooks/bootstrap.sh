#!/usr/bin/env bash



dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

cp $dir/pre-commit $dir/../../.git/hooks/pre-commit
echo "$ cp $dir/pre-commit $dir/../../.git/hooks/pre-commit"

chmod +x $dir/../../.git/hooks/pre-commit
echo "$ chmod +x $dir/../../.git/hooks/pre-commit"

cp $dir/pre-push $dir/../../.git/hooks/pre-push
echo "$ cp $dir/pre-push $dir/../../.git/hooks/pre-push"

chmod +x $dir/../../.git/hooks/pre-push
echo "$ chmod +x $dir/../../.git/hooks/pre-push"

echo "$ done"
