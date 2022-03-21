
set -e

echo """
Please Note:
  This script exists to enable a developer to run a react frontend locally while pointing to an AWS backend.
  This is *not* the same as deploying the entire stack locally.
  This script may be removed soon, as the much more powerful local workflow should make this osoblete.
  However, it will be left for now.
  Please make sure you understand what this script does and why you're using it.
"""

stage=${1:-dev}

echo "Fetching information for stage $stage..."

test_user_1=`sh ../../services/output.sh ../../services/ui TestUserOne $stage`
test_user_2=`sh ../../services/output.sh ../../services/ui TestUserTwo $stage`
test_user_3=`sh ../../services/output.sh ../../services/ui TestUserThree $stage`
test_password_1=`sh ../../services/output.sh ../../services/ui TestPasswordOne $stage`

export TEST_USER_1=$test_user_1
export TEST_USER_2=$test_user_2
export TEST_USER_3=$test_user_3
export TEST_PASSWORD_1=$test_password_1

rm -rf ./test-config.js
touch ./test-config.js
echo "const testConfig = {" >> ./test-config.js
echo "TEST_USER_1: \"$test_user_1\"," >> ./test-config.js
echo "TEST_USER_2: \"$test_user_2\"," >> ./test-config.js
echo "TEST_USER_3: \"$test_user_3\"," >> ./test-config.js
echo "TEST_PASSWORD_1: \"$test_password_1\"," >> ./test-config.js
echo "}" >> ./test-config.js
echo "export default testConfig;" >> ./test-config.js