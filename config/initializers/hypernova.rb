Hypernova.configure do |config|
  config.host = "localhost"
  config.port = 3030
  config.timeout = 1.0
end

class HypernovaErrorReporter
  def on_error(error, *args)
    Rails.logger.warn "Hypernova Error: #{error}"
  end
end

Hypernova.add_plugin!(HypernovaErrorReporter.new)
