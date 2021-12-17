apt-get update
apt-get install vim
curl https://get.starport.network/starport | bash && sudo mv starport /usr/local/bin
cd /workspaces/vaiot_blog/blog && starport chain build
