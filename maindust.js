// classes
// functions
// commands and global variables

// classes

class Miner
{
	constructor()
	{
		this.level = 1
		this.price = 20;

		this.level_display = document.getElementById("clicker_level");
		this.price_display = document.getElementById("clicker_price");
		this.productivity_display = document.getElementById("clicker_productivity");

		this.renew_display();
	}

	click()
	{
		dust += this.get_production_value();
		dust_produced += this.get_production_value();
		renew_dust();
	}

	get_production_value()
	{
		return Math.floor(1 + (0.05 * altogether_productivity * (this.level - 1)) + (this.level - 1));
	}

	improve()
	{
		if(dust >= this.price)
		{
			dust -= this.price;
			this.level += 1;
			this.price *= 2;
			this.renew_display();
		}
		else
		{
			alert("Not enough obsidian dust!");
		}
	}

	renew_display()
	{
		this.level_display.innerHTML = this.level;
		this.price_display.innerHTML = this.price;
		this.productivity_display.innerHTML = this.get_production_value();
	}
}

class Building
{
	constructor(name, productivity, price)
	{
		this.name = name;
		this.level = 0;
		this.price = price;
		this.productivity = productivity;

		// variables for displaying
		// definition of areas
		this.area = document.createElement("span");
		this.area.id = name;

		this.level_display = document.createElement("span");
		this.level_display.id = this.name + "_level";

		this.productivity_display = document.createElement("span");
		this.productivity_display.id = this.name + "_productivity";

		this.price_display = document.createElement("span");
		this.price_display.id = this.name + "_price";

		this.button = document.createElement("button");
		this.button.innerHTML = "Improve";
	        this.button.onclick = this.improve.bind(this);

		// put together
		this.area.append(document.createTextNode(name + " Level: "));
		this.area.append(this.level_display);
		this.area.append(document.createElement("br"));

		this.area.append(document.createTextNode("Dust mined per Second: "));
		this.area.append(this.productivity_display);
		this.area.append(document.createElement("br"));

		this.area.append(document.createTextNode("Improvement Price: "));
		this.area.append(this.price_display);
		this.area.append(document.createElement("br"));

		this.area.append(this.button);
		this.area.append(document.createElement("br"));
		this.area.append(document.createElement("br"));
        
        	setInterval(this.produce.bind(this), 1000);
	}
	
	get_price() 
	{
		return (this.price / 2) * (this.level * this.level + 1) + (this.price / 2) * (this.level + 1)
	}
	
	improve()
	{
        	if(dust >= this.get_price())
        	{
        		dust -= this.get_price();
        		this.level += 1;
        		altogether_productivity += this.productivity;
        		this.renew_display();
        		clicker.renew_display();
        	}
        	else
        	{
			alert("Not enough obsidian dust!");
		}
	}

	renew_display()
	{
		this.level_display.innerHTML = this.level;
		this.productivity_display.innerHTML = this.get_production_value();
		this.price_display.innerHTML = this.get_price();
	}


	set_visible()
	{
		buildings.append(this.area);
		this.renew_display();
	}

	produce()
	{
		dust += this.get_production_value();
		dust_produced += this.get_production_value();
	}
	
	get_production_value()
	{
		return this.level * this.productivity;
	}
}

// functions

function renew_dust()
{
	dust_display.innerHTML = dust;
	dust_produced_display.innerHTML = dust_produced;
    
	if(this.dust_produced >= 200 && miner_enabled == 0) 
	{
		miner.set_visible();
		miner_enabled = 1;
        
	}
	if(this.dust_produced >= 2000 && factory_enabled == 0)
	{
		factory.set_visible(); 
		factory_enabled = 1;
	}
	if(this.dust_produced >= 20000 && cookie_tesla_enabled == 0)
	{
		cookie_tesla.set_visible();
		cookie_tesla_enabled = 1;
	}

	if(this.dust_produced >= 200000 && cookie_gigant_enabled == 0) 
	{
		cookie_gigant.set_visible(); 
		cookie_gigant_enabled = 1;
	}
        dust_display.innerHTML = dust;
	dust_produced_display.innerHTML = dust_produced;
}

// commands and (global) variables

var dust = 0;
var dust_produced = 0;
var altogether_productivity = 0; // counts productivity of buildings except clicker

var dust_display = document.getElementById("dust");
var dust_produced_display = document.getElementById("dust_produced");

var buildings = document.getElementById("buildings");

miner_enabled = 0;
factory_enabled = 0;
cookie_tesla_enabled = 0;
cookie_gigant_enabled = 0;

clicker = new Miner();
baker = new Building("Drill", 1, 20);
baker.set_visible();
bakery = new Building("Obsidian Pressuriser", 10, 200);
factory = new Building("Recycler", 100, 2000);
cookie_tesla = new Building("Hoverdrill", 1000, 20000);
cookie_gigant = new Building("Fusion Explosives", 10000, 200000);

setInterval(renew_dust, 500);
