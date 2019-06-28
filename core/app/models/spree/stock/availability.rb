# frozen_string_literal: true

module Spree
  module Stock
    # This class manages checking stock availability efficiently for a set of
    # Variants and StockLocations.
    #
    # This serves a similar role to Spree::Stock::Quantifier, but is more
    # efficient by checking multiple variants at once.
    class Availability
      # @param variants [Array<Spree::LineItem>] line items to check stock of
      # @param stock_locations [Array<Spree::StockLocation>] stock_locations to check for stock in
      def initialize(line_items:, stock_locations: Spree::StockLocation.active)
        @variants = line_items.map(&:variant)

        @line_items = line_items
        @line_item_map = line_items.index_by(&:variant_id)
        @stock_locations = stock_locations
      end

      # Get the on_hand stock quantities
      # @return [Hash<Integer=>Spree::StockQuantities>] A map of stock_location_ids to the stock quantities available in that location
      def on_hand_by_stock_location_id
        counts_on_hand.to_a.group_by do |(_, stock_location_id), _|
          stock_location_id
        end.transform_values do |values|
          Spree::StockQuantities.new(
            values.map do |(variant_id, _), count|
              line_item = @line_item_map[variant_id]

              count = Float::INFINITY if !line_item.variant.should_track_inventory?
              count = 0 if count < 0
              [line_item, count]
            end.compact.to_h
          )
        end
      end

      # Get the on_hand stock quantities
      # @return [Hash<Integer=>Spree::StockQuantities>] A map of stock_location_ids to the stock quantities available in that location
      def backorderable_by_stock_location_id
        backorderables.group_by(&:second).transform_values do |availabilities|
          Spree::StockQuantities.new(
            availabilities.map do |variant_id, _|
              line_item = @line_item_map[variant_id]
              [line_item, Float::INFINITY]
            end.to_h
          )
        end
      end

      private

      def counts_on_hand
        @counts_on_hand ||=
          stock_item_scope.
            group(:variant_id, :stock_location_id).
            sum(:count_on_hand)
      end

      def backorderables
        @backorderables ||=
          stock_item_scope.
            where(backorderable: true).
            pluck(:variant_id, :stock_location_id)
      end

      def stock_item_scope
        Spree::StockItem.
          where(variant_id: @variants).
          where(stock_location_id: @stock_locations)
      end
    end
  end
end
