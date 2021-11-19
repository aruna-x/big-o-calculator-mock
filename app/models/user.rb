class User < ActiveRecord::Base
    has_many :calcs
end