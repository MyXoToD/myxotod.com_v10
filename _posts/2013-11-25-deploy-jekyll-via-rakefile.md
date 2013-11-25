---
layout: article
title:  "Deploy Jekyll via Rakefile"
date:   2013-11-25 17:23:00
category: coding
---

This website is the first I created with [Jekyll](http://jekyllrb.com). As you may know Jekyll is a ruby gem and therefore it needs a server with ruby installed on it. Unfortunately my current server doesn't support ruby. [Kevin](http://kevingimbel.com) told me about Github pages and its support for Jekyll, because his website is hosted like this.

I really adore hosting websites on my own server, so this option wasn't perfect for me. But what should I do? Meanwhile I really enjoy Jekyll and I don't want to generate a website build and upload the static output via FTP to my server everytime, this would really suck. So I need to deploy the script somehow else. I heard of the [Capistrano](https://github.com/capistrano/capistrano) gem and its power but after a quick overview, this seemed to be a little bit too powerful. Fuck. So I tried to solve it on my own.

## Using FTP

Because I'm familiar with FTP I thought about a script which automatically generates a stable build of my current website and transfers the files to my server. After a couple of tries I gave up. Fuck that shit, now I know why FTP has a bad reputation. Really, it sucks.

## Using SSH

My sever doesn't support ruby but ssh access, so I gave it a try. First I came up with something using "net::ssh" to connect and edit my remote filesystem but that was crap like FTP, because I wasn't able to use some functions I really needed.

So here is how I did it via my Rakefile:
First I need two different tasks, one to build the static website out of the source files and one to upload the files.

{% highlight ruby %}
# Rakefile

task :default => [:deploy]

task :build do
  # Build website
end

task :deploy => :build do
  # Upload files
end
{% endhighlight %}

As you can see I added a line to make sure the default rake task is "deploy". I also added a statement to the deploy-task, that precompiles the "build"-task. With this setting I only need to call on command and this without calling it by its actual name. In a normal case I would need to use "rake deploy" to call the deploy task but in this case I only need to call "rake" to fire the action. This will automatically start the build task and then the deploy path, because I connected them.

To generate the Jekyll build I added this:

{% highlight ruby %}
# Rakefile

task :build do
  system("jekyll build")
end
{% endhighlight %}

This will generate the static website out of my source files and store it inside the "_site"-folder by jekyll defaults. Let's go on with the deploy task:

{% highlight ruby %}
# Rakefile

task :deploy => :build do
  HOST = "website.com"
  USER = "SSH_USERNAME"
  DESTINATION = "/ABSOLUTE/PATH/ON/REMOTE"
  SOURCE = "#{Dir.pwd}/_site/"
end
{% endhighlight %}

To make things easier I added some variables. The source directory is automatically generated. The next thing would be to connect to the server via SSH and upload the files. I tried a lot of functions and different solutions but only this one worked as I wanted:

{% highlight ruby %}
# Rakefile
task :deploy => :build do
  HOST = "website.com"
  USER = "SSH_USERNAME"
  DESTINATION = "/ABSOLUTE/PATH/ON/REMOTE"
  SOURCE = "#{Dir.pwd}/_site/"

  system("rsync -avz --delete #{SOURCE} #{USER}@#{HOST}:#{DESTINATION}")
end
{% endhighlight %}

Rsync helps me to connect to my server and tranfer files from my local source path to the remote destination path. Option **-a** means archive mode. Option **-v** means "verbose", it gives me some feedback while uploading files. Option **-z** means "Compress file data during the transfer". As soon as rsync is called by the deploy task, a password prompt appears. Type in the SSH password and hit return to run the script. Voilá your site is online.

To get some more output I added some more lines:

{% highlight ruby %}
# Rakefile

task :default => [:deploy]

task :build do
  puts "----------"
  puts "Generating current Jekyll build..."
  puts "----------"
  system("jekyll build")
  puts "----------"
  puts "Build ready."
  puts "----------"
  puts ""
  puts ""
end

task :deploy => :build do
  HOST = "website.com"
  USER = "SSH_USERNAME"
  DESTINATION = "/ABSOLUTE/PATH/ON/REMOTE"
  SOURCE = "#{Dir.pwd}/_site/"

  puts "----------"
  puts "Connecting to '#{HOST}' via SSH..."
  puts "Please enter the remote password to start file transfer."
  puts "----------"
  puts ""
  puts ""
  puts "----------"
  system("rsync -avz --delete #{SOURCE} #{USER}@#{HOST}:#{DESTINATION}")
  puts "----------"
  puts ""
  puts ""
  puts "----------"
  puts "File tranfer complete."
  puts "Website is now live: #{HOST}"
  puts "----------"
end
{% endhighlight %}

See this code on [Github](https://github.com/MyXoToD/myxotod.com/blob/master/Rakefile).