#
# Get the absolute location of this script so we can correctly symlink the files
# and other dependencies can also force bigpipe in to submission by manually calling
# this supplied symlink file.
#
ROOT="$( cd "$( dirname "$0" )" && pwd )"

#
# Tell npm to install our core dependencies through the github master branches.
#
npm install --prefix $ROOT bigpipe/bigpipe