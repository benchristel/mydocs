export PGHOST=localhost

printf "$(/Users/bchristel/.rvm/rubies/ruby-1.9.2-p290/bin/ruby ~/Desktop/projects/Dunmanifestin/script/make_manifest.rb -hg sophistry)\r"

eval "$(rbenv init - )"
rbenv rehash

parse_git_branch () {
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1 /'
}

magenta () {
 tput setaf 5
}

alternate_color () {
 histno="$(history | tail -1 | sed -e 's/ *\([0-9]*\).*/\1/')"
 if [ "$(expr $histno % 2)" -eq '1' ]; then
  tput setaf 6
 else
  tput setaf 5
 fi
}

cyan () {
 tput setaf 6
}

green () {
 tput setaf 2
}

clear_color () {
 tput sgr0
}

#PS1='$(parse_git_branch)\w \$ '
PS1='\[$(tput bold)\]$(parse_git_branch)\[$(alternate_color)\]\w \$ \[$(tput sgr0)\]'

shopt -s extglob

### ban risky actions
rm () {
 echo "No."
}

### always use gnutar
[[ $(which /usr/bin/gnutar) ]] && alias tar='/usr/bin/gnutar'

################
# GIT SHORTCUTS

alias gs="git status"
alias gb="git branch"
alias gc="git checkout"
alias gbm="git checkout master && git pull && git checkout -b"
alias gcm="git checkout master"
alias gd="git diff"
alias gds="git diff --staged"

gu () {
 git push origin $(parse_git_branch)
}

gdown () {
 git pull origin $(parse_git_branch)
}

alias gdoom="git pull origin master"
alias gum="git push origin master"
alias mm="cd ~/mastermerchant && gs"
alias ug="cd ~/ubergateway && gs"
alias ap="cd ~/Desktop/projects/anonymouspost && gs"

### Delete all merged branches

alias gcleanup="git branch | sed -E 's/\*|deploy|prod_deploy|master//g' | xargs git branch -d"

alias dbup="bundle exec rake db:migrate db:test:prepare"
alias dbdown="bundle exec rake db:rollback db:test:prepare"

alias spec="RUBYOPT=W0 spring rspec"

UGW1="ubergateway_deploy@paygw-worker1.snc1"
UGW2="ubergateway_deploy@paygw-worker2.snc1"
UGW3="ubergateway_deploy@paygw-worker3.snc1"
MMW1="mastermerchant_deploy@mastermerchant-worker1.snc1"
MMW2="mastermerchant_deploy@mastermerchant-worker2.snc1"

[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*

printf "                                                                                                                 \r"

