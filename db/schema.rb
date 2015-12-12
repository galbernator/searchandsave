# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151126041713) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "search_vendors", force: :cascade do |t|
    t.integer  "search_id"
    t.integer  "vendor_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "search_vendors", ["search_id"], name: "index_search_vendors_on_search_id", using: :btree
  add_index "search_vendors", ["vendor_id"], name: "index_search_vendors_on_vendor_id", using: :btree

  create_table "searches", force: :cascade do |t|
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "search_query"
  end

  create_table "vendors", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "search_vendors", "searches"
  add_foreign_key "search_vendors", "vendors"
end
