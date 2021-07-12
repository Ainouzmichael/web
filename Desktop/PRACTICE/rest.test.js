const { sequelize } = require("./data");

const { Restaurant, Menu, Item } = require("./rest")


describe('rest Database', () => {

    beforeAll(async() => {
        await sequelize.sync({ force: true })
    })

    test('can create a Restaurant', async() => {
        const testRest = await Restaurant.create({ name: 'sushi-eats' })
        expect(testRest.name).toBe('sushi-eats')
    })

    test('can create a Menu', async() => {
        const testMenu = await Menu.create({ name: 'sushi-spring' })
        expect(testMenu.name).toBe('sushi-spring')
    })


    test('can create a item', async() => {
        const testItem = await Item.create({ name: 'sushi' })
        expect(testItem.name).toBe('sushi')
    })

    test('Restaurant can have menu', async() => {
        const sushiEats = await Restaurant.create({ name: 'sushiEat' })

        const sushiSpring = await Menu.create({ name: 'SushiSpring' });
        const sushiFall = await Menu.create({ name: 'SushiFall' });

        const sushi1 = await Item.create({ name: 'Sushi1' });
        const sushi2 = await Item.create({ name: 'Sushi2' });
        const sushi3 = await Item.create({ name: 'Sushi3' });
        const sushi4 = await Item.create({ name: 'Sushi4' });


        await sushiEats.addMenu(sushiFall)
        await sushiEats.addMenu(sushiSpring)


        await sushiFall.addItem(sushi1)
        await sushiFall.addItem(sushi3)

        await sushiSpring.addItem(sushi2)
        await sushiSpring.addItem(sushi4)
        await sushiSpring.addItem(sushi3)


        const item = await sushiSpring.getItems()

        const item2 = await sushiEats.getMenus()

        const item3 = await item2[0].getItems()


        expect(item.length).toBe(3)
        expect(item[0].name).toBe('Sushi2')
        expect(item2.length).toBe(2)
        expect(item[0] instanceof Item).toBeTruthy

    })



})