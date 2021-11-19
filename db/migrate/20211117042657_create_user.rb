class CreateUser < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :email
      t.string :password
      t.timestamps null: false
    end
  end
end
