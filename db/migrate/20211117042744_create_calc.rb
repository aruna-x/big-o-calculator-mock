class CreateCalc < ActiveRecord::Migration[6.1]
  def change
    create_table :calcs do |t|
      t.string :code
      t.string :big_o
      t.belongs_to :user
      t.timestamps null: false
    end
  end
end
