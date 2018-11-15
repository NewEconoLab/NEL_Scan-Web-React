
const id_GAS: string = "0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
const id_NEO: string = "0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";

export const toChangeAssetName = (assets) =>
{
    const names = assets.name;
    const id = assets.id || assets.asset;
    let name: string = '';
    if (id === id_GAS)
    {
        name = 'GAS';
    }
    else if (id === id_NEO)
    {
        name = 'NEO';
    } else
    {
        name = names[0].name;             
    }
    return name;
}