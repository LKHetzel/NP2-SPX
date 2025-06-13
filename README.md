# NP2-SPX Bridge

**Bridge NowPlaying2 track data directly to SPX Graphics for automated lower third graphics.**

Automatically pulls "now playing" track information from NowPlaying2 and updates SPX Graphics rundown items in real-time. Perfect for DJ streams, radio shows, and live broadcasts.

## Features

- 🎵 **Real-time sync** - Automatically updates SPX graphics when tracks change
- 🎬 **Manual control** - Graphics update data but don't auto-play (controlled via Bitfocus Companion)
- 🎛️ **Companion integration** - Optional button feedback system with visual indicators
- 🔧 **Configurable** - Flexible setup via environment variables
- 🎨 **Custom templates** - Includes polished lower third template with animations

## Prerequisites

- **Node.js** (v14+ recommended)
- **SPX Graphics** server running - https://spx.graphics
- **NowPlaying2** with WebSocket output enabled - https://www.nowplaying2.com
- **Bitfocus Companion** (optional, for manual control) - https://bitfocus.io/companion

## Installation

1️⃣ **Clone and install:**
```bash
git clone https://github.com/LKHetzel/NP2-SPX
cd np2-spx
npm install
```

2️⃣ **Configure environment:**
```bash
cp env_template .env
```

3️⃣ **Edit `.env` file with your settings:**
```env
# NowPlaying2 SocketIO Connection
NP2_HOST=localhost
NP2_PORT=9091

# SPX Graphics Server
SPX_HOST=localhost
SPX_PORT=5656
SPX_PROJECT=
SPX_RUNDOWN=
SPX_ITEMID=Lower3rd
SPX_TEMPLATE_PATH=path/to/your/template.html

# SPX Playout Settings
SPX_CASPAR_SERVER=OVERLAY
SPX_CASPAR_CHANNEL=1
SPX_CASPAR_LAYER=20
SPX_WEBPLAYOUT_LAYER=20

# Companion Feedback (Optional)
ENABLE_COMPANION_FEEDBACK=true
COMPANION_HOST=localhost
COMPANION_PORT=8000
STATUS_PORT=3001
```
The env.template/.env file explains these variables in more detail.

4️⃣ **Add SPX template:**
- Copy the `NP2_Lowerthird.html` template to your SPX `templates/vendor/pack/` directory
- Or update `SPX_TEMPLATE_PATH` to match your template location

5️⃣ **Set up SPX rundown:**
- Create a project and set `SPX_PROJECT` to the name of your project.
- Create a rundown and set `SPX_RUNDOWN` to the name of the rundown.
- Add a rundown item with ID `Lower3rd` (or whatever you want to call it and set `SPX_ITEMID` to that name.
- Assign the template to this rundown item

## Usage

**Start the bridge:**
```bash
npm start
```

The bridge will:
- ✅ Connect to NowPlaying2 WebSocket
- ✅ Listen for track changes  
- ✅ Update SPX rundown item data automatically
- ✅ Send Companion triggers (if enabled)

**Control playback:**
- Graphics data updates automatically but won't auto-play
- Use Bitfocus Companion or SPX GUI to trigger playout
- Manual control prevents interrupting currently visible graphics

## Bitfocus Companion Setup

### Basic Control (Required)

1️⃣ **Install SPX Graphics Controller module in Companion:**
- Add instance: `SPX Graphics Controller`
- Configure connection to your SPX server (typically `localhost:5656`)

2️⃣ **Create control buttons:**

**Play Button:**
- **Action**: `SPX Graphics Controller: Control Rundown Item`
- **Project**: `Project Name`
- **Rundown**: `Rundown Name`
- **Item ID**: `ItemID`
- **Command**: `Play`

**Stop Button:**
- **Action**: `SPX Graphics Controller: Control Rundown Item`
- **Project**: `Project Name`
- **Rundown**: `Rundown Name`
- **Item ID**: `ItemID`
- **Command**: `Stop`

### Advanced: Button Feedback (Optional)

If `ENABLE_COMPANION_FEEDBACK=true`, you can set up visual button feedback that shows when new track data is ready.

#### Step 1: Configure OSC in Companion

**In Companion, add an OSC instance:**

1️⃣ **Add Instance:**
- **Type**: `Generic: OSC`
- **Label**: `NP2 Bridge`
- **Target IP**: `127.0.0.1` (localhost)
- **Target Port**: `8000` (or your `COMPANION_PORT`)
- **Listen Port**: `8001` (different than target port)

#### Step 2: Create Triggers

**Go to the "Triggers" tab:**

1️⃣ **Create "New Track" Trigger:**
- **Events**: `Generic OSC: OSC message received`
- **Instance**: `NP2 Bridge` (your OSC instance)
- **Conditions**: 
  - OSC Path = `/new-track`
- **Actions**:
  - `Internal: Set custom variable`
  - **Variable**: `new_track`
  - **Value**: `1`

2️⃣ **Create "Reset" Action on your Play Button:**
- **Action 1**: `SPX Graphics Controller: Control Rundown Item` (play the graphic)
- **Action 2**: `Internal: Set custom variable`
  - **Variable**: `new_track` 
  - **Value**: `0`

#### Step 3: Add Button Feedback

**On your Play button:**
- **Feedbacks** → **Add Feedback**
- **Type**: `Internal: Custom variable`
- **Variable**: `$(internal:new_track)`
- **Comparison**: `Equal`
- **Value**: `1`
- **Style Override**: Orange/Red background (or whichever colors you prefer)

**How it works:**
1. 🎵 New track → Node.js sends OSC `/new-track` → Button turns the color of your style override
2. 🎬 Press button → Plays graphic + resets variable → Button turns the base button color

# FAQ
## Why all the network stuff?!
I run a fairly advanced streaming setup, which includes my DJ laptop running NowPlaying2, a main stream computer running OBS, and a network server that handles all of the SPX requirements. You do NOT need a setup this complex for this to work, but the flexibility is there. If you are doing this all from one computer, setting things to localhost is perfectly fine!

## Where do I get template.html
That's the tricky bit - I built a custom template that matches all the other graphics I use on my stream, and I'm not about to give out my personal graphics package.

For this, I do plan on adding a basic template in the next few weeks, that's different than what I use but still fully compliant and usable out of the box. That will show how styling works.

You can always read SPX's documentation, and if you're any good at modern CSS for animations and vectors - you're good to go. The data fields in `spxSender.js` will show you what the field mapping is.

You do have another option though - Just ask your preferred Agentic Coding AI to use the power of a small country to make you a "Lower third graphics template compatible with SPX" and also link it this repository. It'll go to town and then you can tell it how to style it. Turns out most of the popular ones uhave some basic knowledge of what's required in an SPX template. 

## Troubleshooting

**Connection Issues:**
- Verify NowPlaying2 WebSocket is enabled and accessible
- Check SPX server is running and API is accessible
- Confirm firewall/network settings allow connections

**Template Issues:**
- Ensure template file is in correct SPX templates directory
- Check SPX rundown item is properly configured
- Verify template path in `.env` matches actual location

**Companion Feedback:**
- Confirm Companion OSC instance is configured and running
- Check OSC path matches exactly (`/new-track`)
- Verify `COMPANION_HOST` and `COMPANION_PORT` are correct (default 8000)
- Test OSC connection using Companion's OSC tester

**Debug:**
- Check console output for connection status and errors
- Visit `http://localhost:3001/status` (if feedback enabled) for current state
- Enable SPX API logging for detailed request/response info

# Like this?
If you like this app and it's useful, you can buy me a coffee/beer/etc if you want to. 

https://ko-fi.com/lkhetzel

What's more useful is seeing this app in action on my DJ streams, over at https://mixcloud.com/djcryptografik

Or at my website https://djcryptografik.com

## License

GNU AFFERO GENERAL PUBLIC LICENSE - See LICENSE for more information.
