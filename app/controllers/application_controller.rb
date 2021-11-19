class ApplicationController < Sinatra::Base

    set :bind, '0.0.0.0'
  
    configure do
        enable :cross_origin
    end
 
    before do
        response.headers["Access-Control-Allow-Methods"] = "GET, PUT, POST, DELETE, OPTIONS"
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        
    end

    # ROUTES

    post '/create-user' do
        createUser = JSON.parse(request.body.read)
            first_name = createUser["first_name"]
            email = createUser["email"]
            password = createUser["password"]
        
        user = User.create(
            first_name: first_name,
            email: email,
            password: password
        )

        {id: user["id"], name: user["first_name"], calcHistory: user.calcs}.to_json
    end

    get '/users/:email/:password' do
        user = User.all.where('email = ? and password = ?', params[:email], params[:password])[0]
        {id: user["id"], name: user["first_name"], calcHistory: user.calcs}.to_json
    end

    post '/calcs/:id' do
        createCalc = JSON.parse(request.body.read)
            code = [createCalc["code"], createCalc["hotLines"]]
            bigOEst = createCalc["bigOEst"]
            user_id = params[:id]
        calc = Calc.create(
            code: code,
            big_o: bigOEst,
            user_id: user_id
        )
        {code: [createCalc["code"], createCalc["hotLines"]], bigOEst: createCalc["bigOEst"], user_id: params[:id]}.to_json
    end
    
    post '/calcs/delete/:id' do
        deleteCalc = Calc.all.where("id = ?", params[:id])
        Calc.destroy(deleteCalc.id)
        "done".to_json
    end
    
    options "*" do
        response.headers["Access-Control-Allow-Methods"] = "GET, PUT, POST, DELETE, OPTIONS"
        response.headers["Allow"] = "GET, PUT, POST, DELETE, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token"
        response.headers["Access-Control-Allow-Origin"] = "*"
        200
    end

  end