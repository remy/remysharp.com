
### Fixing Power

1. Visual inspection of battery terminals, if they're free of corrosion, put in fully charged AA batteries and test if the device turns on.

If it turns on then we're good.

If it doesn't turn on, move on to checking power with the DC jack.

2. Does the Gameboy turn on using the DC barrel jack?

If it does, the problem is localised to the battery connection.

```mermaid
stateDiagram-v2
 BatteriesWork: Battery terminals clean?
 CheckContP43: Continuity on DC pin 4 & 3
 CheckContP12: Continuity on power switch pin 1 & 2
 DirtyBatteryTerminals: Remove/desolder terminals,<br>wash in warm white vinegar
 DCPowered: "Power from DC jack?"
 CheckVoltageP4: Check for voltage on DC pin 4
 CleanDC: Clean DJ jack with IPA
 CleanRemovedDCJack: Desolder and clean entire DJ jack with IPA.<br>Possibly needs replacing.


 state if_batteries_clean <<choice>>
 [*] --> BatteriesWork
 BatteriesWork --> if_batteries_clean
 if_batteries_clean --> DCPowered: yes
 if_batteries_clean --> DirtyBatteryTerminals: no

 DirtyBatteryTerminals --> BatteriesWork: reattach and test

 state if_powered <<choice>>
 DCPowered --> if_powered
 if_powered --> CheckVoltageP4: no
 if_powered --> [*]: yes

 state if_volt_on_p4 <<choice>>
 CheckVoltageP4 --> if_volt_on_p4
 if_volt_on_p4 --> CleanDC: none
 if_volt_on_p4 --> CheckContP43: present

 Note right of CleanDC: There's a switch inside the JC jack<br>that's not making proper contact to<br>allow power to pass through

 CleanDC --> CheckContP43
 state if_cont_p43 <<choice>>
 CheckContP43 --> if_cont_p43
 if_cont_p43 --> CheckContP12: yes
 if_cont_p43 --> CleanRemovedDCJack: no

 CleanRemovedDCJack --> [*]

```

```js
insertBatteries();

if (poweredByBatteries()) {
  return READY;
}

removeBatteries();

if (poweredByDC()) {
  // then problem with power getting through to the DC

  removePowerJack();
  insertBatteries();

  if (voltageOnDCPin(4)) {
    // check for continuity on pin 3
    if (continuityBetweenPins(4, 3, "dcjack")) {
      // power is going through the DC jack correct so we'll check the switch
       if (continuityBetweenPins(1, 2, "power_switch")) {
         // then we move onto the power regulator

        // test you're getting 5V out of the regulator.
        // visual inspection of caps, plus short tests

       } else {
         // carefully clean - this can be completely removed and opened to clean
         // the contacts, but make sure to take note of how to put it together again
         cleanPowerSwitch();
         return ISSUE_FOUND;
       }

    } else {
      // there's a switch inside the DC jack that is not making proper contact
      // that allows power to pass through.
      cleanDCJackWithIPA();
      if (!continuityBetweenPins(4, 3)) {
        desolderDCJack();
        cleanDCJackWithIPA();

      }
    }
  } else {
    checkTracesWithMultimeter();
    // we're looking for a break on the traces from the DC pin 4 and the positive
    // battery terminal - once you find the break, you'll need to use a jumper
    // wire to bridge the gap.
    return ISSUE_FOUND;
  }
}
```

