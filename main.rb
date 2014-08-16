require 'sinatra'
require 'oauth'
require 'twitter'

enable :sessions

API_KEY = ENV["API_KEY"]
API_SECRET = ENV["API_SECRET"]

DOMAIN = ENV["DOMAIN"]

consumer = OAuth::Consumer.new(API_KEY, API_SECRET, :site => "https://api.twitter.com")
callback_url = "http://" + DOMAIN + "/setname_callback"

get '/' do
	send_file "public/index.html"
end

post '/setname' do
	session[:name] = params[:name]
	# grab an OAuth token and redirect
	request_token = consumer.get_request_token(:oauth_callback => callback_url)
	session[:oauth_request_token] = request_token
	redirect(request_token.authorize_url(:oauth_callback => callback_url))
end

get '/setname_callback' do
	access_token = session[:oauth_request_token].get_access_token(:oauth_verifier => params[:oauth_verifier])
	client = Twitter::REST::Client.new do |config|
		config.consumer_key = API_KEY
		config.consumer_secret = API_SECRET
		config.access_token = access_token.token
		config.access_token_secret = access_token.secret
	end
	client.update_profile(:name => session[:name])
	redirect("/#success")
end