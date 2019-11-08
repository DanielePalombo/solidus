# frozen_string_literal: true

require 'reverse_coverage'

RSpec.configure do |config|
  solidus_version = Spree.solidus_version
  solidus_component = 'frontend'

  config.before(:suite) do
    ReverseCoverage::Main.output_path = "../tmp/#{solidus_version}/#{solidus_component}"
    ReverseCoverage::Main.start
  end

  config.around do |e|
    e.run
    ReverseCoverage::Main.add(e)
  end

  config.after(:suite) do
    ReverseCoverage::Main.save_results
    coverage_matrix = ReverseCoverage::Main.coverage_matrix
    html_formatter = ReverseCoverage::Formatters::HTML::Formatter.new
    html_formatter.format(coverage_matrix)

    path_to_settings = File.expand_path(File.join(html_formatter.asset_output_path, 'settings.js'))

    js_github_base_url = "window.base_url='https://github.com/solidusio/solidus/blob/v#{solidus_version}/#{solidus_component}/';"
    File.open(path_to_settings, File::CREAT | File::TRUNC | File::RDWR) do |f|
      f.write(js_github_base_url)
    end
  end
end

