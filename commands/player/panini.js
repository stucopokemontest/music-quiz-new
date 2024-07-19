const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = (client) => {
    return {
        data: new SlashCommandBuilder()
            .setName('panini')
            .setDescription('panini'),

        async execute(interaction) {
            const channel = interaction.member?.voice.channel;
            if (channel) {
                /**
                 * The user is in a voice channel, try to connect.
                 */
                try {
                    let inst = client.getInstance(interaction.guildId)
                    const url = "https://www.youtube.com/watch?v=hUE2DuMP9y8";
                    await client.playSong(url, inst);

                    const connection = await client.connectToChannel(channel);

                    connection.on('stateChange', (oldState, newState) => {
                        console.log(`Connection transitioned from ${oldState.status} to ${newState.status}`);
                    });
                    /**
                     * We have successfully connected! Now we can subscribe our connection to
                     * the player. This means that the player will play audio in the user's
                     * voice channel.
                     */
                    connection.subscribe(inst.player);
                    
                    await interaction.reply('Playing now!');
                } catch (error) {
                    /**
                     * Unable to connect to the voice channel within 30 seconds :(
                     */
                    console.error(error);
                }
            } else {
                /**
                 * The user is not in a voice channel.
                 */
                void interaction.reply('Join a voice channel then try again!');
            }
        },
    }
};