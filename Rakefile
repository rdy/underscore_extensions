require 'bundler/gem_tasks'
require 'jshint/tasks'

begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort 'Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine'
  end
end

JSHint.config_path = 'config/jshint.yml'

task :default => [:jshint, :'jasmine:ci']
