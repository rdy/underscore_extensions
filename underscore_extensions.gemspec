# -*- encoding: utf-8 -*-
$:.push File.expand_path('../lib', __FILE__)
require 'underscore_extensions/version'

Gem::Specification.new do |s|
  s.name        = 'underscore_extensions'
  s.version     = UnderscoreExtensions::VERSION
  s.authors     = ['Ryan Dy']
  s.email       = ['ryan.dy@gmail.com']
  s.homepage    = 'http://github.com/rdy/underscore_extensions'
  s.summary     = %q{Extensions to underscore javascript library as a rails engine}
  s.description = %q{Adds extensions to the underscore javascript library. It adds the javascript as a rails engine to be included in to a Rails 3+ project. To use it make sure require underscore, underscore.string and underscore.extensions.}

  s.rubyforge_project = 'underscore_extensions'

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  s.add_development_dependency 'fuubar'
  s.add_development_dependency 'jasmine'
  s.add_development_dependency 'jshint_on_rails'
  s.add_development_dependency 'thin'
  s.add_runtime_dependency 'rails', '>= 3.1'
  s.add_runtime_dependency 'rails', '>= 3.1'
end
