#!/usr/bin/env node
const os = require('os')
const ifaces = os.networkInterfaces()
const clipboardy = require('clipboardy')

const ips = Object.keys(ifaces).reduce((arr, ifname) => {
    const alias = 0
    ifaces[ifname].forEach((iface) => {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            return
        }
        if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            arr.pushr({ name: `${ifname}:${alias}`, address: iface.address })
        }
        else {
            // this interface has only one ipv4 adress
            arr.push({ name: ifname, address: iface.address })
        }
    })
    return arr
}, [])

ips.forEach((i) => {
    if (i.address.indexOf('17.') === 0) {
        console.log(`${i.address} (copied to the clipboard)`)
        clipboardy.writeSync(i.address)
    }
    else {
        console.log(i.address)
    }
})
