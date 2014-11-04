task :default => [:deploy]

task :build do
  puts "---> Generating current Jekyll build."
  system("jekyll build")
  puts "---> Build ready."
end

task :deploy => :build do
  HOST = "myxotod.de"
  USER = "ssh-w00be51f"
  DESTINATION = "/www/htdocs/w00be51f/myxotod.de/v10"
  SOURCE = "#{Dir.pwd}/_site/"

  puts "---> Connecting to '#{HOST}' via SSH."
  puts "---> Please enter the remote password to start file transfer."
  system("rsync -avz --delete #{SOURCE} #{USER}@#{HOST}:#{DESTINATION}")
  puts "---> File tranfer complete."
  puts "---> Website is now live: #{HOST}"
end