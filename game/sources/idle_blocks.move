module idle_blocks::main {
    use std::string;
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    struct Character has key, store {
        id: UID,
        strength: u64,
        stamina: u64,
        experience: u64,
        name: string::String
    }

    struct AdminCap has key, store {
        id: UID,
    }

    fun init(ctx: &mut TxContext) {
        let admin = AdminCap {
            id: object::new(ctx),
        };

        transfer::transfer(admin, tx_context::sender(ctx));
    }


    public entry fun character_create(name: vector<u8>, ctx: &mut TxContext) {
        use sui::transfer;

        let character = Character {
            id: object::new(ctx),
            strength: 1,
            stamina: 1,
            experience: 0,
            name: string::utf8(name)
        };

        transfer::transfer(character, sui::tx_context::sender(ctx));
    }

    public entry fun play(character: &mut Character) {
        character.experience = character.experience + 1;
    }
}
