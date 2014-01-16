---
layout: article
title:  "Deploy Jekyll via Rakefile"
date:   2013-11-25 17:23:00
category: coding
---

Your website is built of Jekyll? Your server doesn't support Ruby? Therefore you can't host you site? Well, exactly this was my case. I found a gem called [Capistrano](https://github.com/capistrano/capistrano), which is for website deployment but this thing seemed just too big for my needs. Anyway, I managed to push this Jekyll website on my server with just a single command. This is how I did it.

## The Rakefile

First you need to create a *Rakefile* in the root directory of your Jekyll site. So add a new file and name it "Rakefile". Voilá, first step done.

## The Rake Tasks

Now we need to feed the rakefile with two tasks. In this case a task is just a method which will be executed by the rakefile. The first task is going to be the *build*-task, it'll generate a stable build of your Jekyll source files into the "_site"-folder (by Jekyll defaults). The second task will connect to our server via SSH and synchronize our local files with the files on the server. Let's go then, open your rakefile:

{% highlight ruby %}
task :default => [:deploy]

task :build do
  # Build website
end

task :deploy => :build do
  # Upload files
end
{% endhighlight %}

Alright, now we have our two tasks and another line. The first line is to make sure that the *deploy*-task is the default task. For example: If we wanna call a rake task via console, we need to use this command <tt>$ rake deploy</tt>. With that first line the deploy task is the default, so we can just call <tt>$ rake</tt> to start.

Maybe you noticed another thing. The *deploy*-task is already different than the *build*-task. Why? This <tt>task :deploy => :build do</tt> means, that the *build*-task is called right before the *deploy*-task. Makes sense eh? Let's go on.

{% highlight ruby %}
task :default => [:deploy]

task :build do
  system("jekyll build")
end

task :deploy => :build do
  # Upload files
end
{% endhighlight %}

To generate our Jekyll build, this will do the trick: <tt>system("jekyll build")</tt>. It will just fire a system command, the same as we would do it manually. I guess I don't need to explain that further. 

{% highlight ruby %}
task :default => [:deploy]

task :build do
  system("jekyll build")
end

task :deploy => :build do
  HOST = "example.com"
  USER = "john-doe"
  REMOTE = "/www/htdocs/foo/bar"
  LOCAL = "#{Dir.pwd}/_site/"
end
{% endhighlight %}

To make things easier I made some variables with the data we need to continue.

  - <tt>HOST</tt> => Remote server host
  - <tt>USER</tt> => Remote server username
  - <tt>REMOTE</tt> => The absolute path to the destination on your remote server
  - <tt>LOCAL</tt> => The absolute path to your local "_site"-folder of Jekyll (automatically generated)

{% highlight ruby %}
task :default => [:deploy]

task :build do
  system("jekyll build")
end

task :deploy => :build do
  HOST = "example.com"
  USER = "john-doe"
  REMOTE = "/www/htdocs/foo/bar"
  LOCAL = "#{Dir.pwd}/_site/"

  system("rsync -avz --delete #{LOCAL} #{USER}@#{HOST}:#{REMOTE}")
end
{% endhighlight %}

Last but not least we need the <tt>rsync</tt>-command. This will connect to <tt>HOST</tt> with <tt>USER</tt> via SSH and synchronize the folders/files between the <tt>LOCAL</tt>- and <tt>REMOTE</tt>-directory. As soon as <tt>rsync</tt> is called, a password prompt appears. Type in the SSH password and hit return to run the script. Voilá your site is online. There are also some options: Option **-a** means archive mode. Option **-v** means "verbose", it gives me some feedback while uploading files. Option **-z** means "Compress file data during the transfer".

Navigate to your Jekyll's root folder via console and type <tt>$ rake</tt> to start the tasks. To get a little bit more output I updated the script like this:

{% highlight ruby %}
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
  HOST = "example.com"
  USER = "john-doe"
  REMOTE = "/www/htdocs/foo/bar"
  LOCAL = "#{Dir.pwd}/_site/"

  puts "----------"
  puts "Connecting to '#{HOST}' via SSH..."
  puts "Please enter the remote password to start file transfer."
  puts "----------"
  puts ""
  puts ""
  puts "----------"
  system("rsync -avz --delete #{LOCAL} #{USER}@#{HOST}:#{REMOTE}")
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