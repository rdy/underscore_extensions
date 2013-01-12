ENV['JASMINE_SPEC_FORMAT'] = 'Fuubar'
# Disable chrome for travis ci
# ENV['JASMINE_BROWSER'] = 'chrome'

require 'bundler/gem_tasks'
require 'jslint/tasks'

begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort 'Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine'
  end
end

JSLint.config_path = 'config/jshint.yml'

task :default => [:jslint, :'jasmine:ci']
