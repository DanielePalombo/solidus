# frozen_string_literal: true

module Spree
  module UserPaymentSource
    extend ActiveSupport::Concern

    included do
      Spree::Deprecation.warn('Spree::UserPaymentSource is deprecated, please stop including it.', caller)
    end
  end
end
