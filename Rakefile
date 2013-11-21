require 'rake'
require 'rake/contrib/ftptools'
#capistrano

class FTP < Net::FTP
  def remove_all_below dir
    dircontent = list("-A1", dir)
    dircontent.each do |file|
      filepath = File.join(dir, file)
      begin
        remove_all_below filepath
        rmdir filepath
      rescue
        delete filepath
      end
    end
  end
  def remove_all dir
    remove_all_below dir
    rmdir dir
  end
end

HOST = "myxotod.de"
USER = ""
PASS = ""
DESTINATION = "myxotod.de/v10"
SOURCE = "_site/**/*"

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

task :upload => :build do
  puts "----------"
  puts "Uploading files to '#{HOST} (#{DESTINATION})'..."
  Rake::FtpUploader.connect(DESTINATION, HOST, USER, PASS) do |ftp|
    ftp.verbose = true
    ftp.upload_files(SOURCE)
  end
  puts "Upload done."
  puts "----------"
  puts "Application is now live: #{HOST}"
  puts "----------"
end

# task :upload_test => :build do
#   puts "----------"
#   puts "Logging in to FTP @ #{HOST} ..."
#   ftp = Net::FTP.new(HOST)
#   ftp.binary=
#   ftp.login(USER, PASS)
#   puts "Logged in @ #{HOST}."
#   puts "----------"
#   puts "Changing dir to #{DESTINATION}"
#   ftp.chdir(DESTINATION)
#   puts "----------"
#   puts "Clear '#{DESTINATION}'-folder"
#   # Delete files however
#   puts "Cleared."
#   puts "----------"
#   puts "Copy files ..."
#   puts "LOCAL: #{SOURCE}"
#   puts "to"
#   puts "REMOTE: #{DESTINATION}"
#   # Copy local files to ftp however
#   puts "All files copied."
#   puts "----------"
#   puts "Application is now live: #{HOST}"
#   puts "----------"
# end