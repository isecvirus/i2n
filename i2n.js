"use strict";
exports.__esModule = true;
var process_1 = require("process");
function i2n(ip) {
    try {
        if (ip.split(".").length === 4) {
            var mx_oct = 0x100; // 0xff=256
            var i1 = +ip.split(".")[0];
            var i2 = +ip.split(".")[1];
            var i3 = +ip.split(".")[2];
            var i4 = +ip.split(".")[3];
            if (i1 <= 255 && i1 >= 0
                && i2 <= 255 && i2 >= 0
                && i3 <= 255 && i3 >= 0
                && i4 <= 255 && i4 >= 0) { // check if every ip octet is not bigger than 255 or smaller than 0
                // o=octet
                // i=ip
                var o1 = mx_oct * (mx_oct * mx_oct) * i1;
                var o2 = (mx_oct * mx_oct) * i2;
                var o3 = mx_oct * i3;
                var o4 = i4;
                var number = Number(o1 + o2 + o3 + o4);
                return number;
            }
            else {
                // console.log("[-] Maximum IP octet is 255 and only numbers are allowed.")
            }
        }
        else {
            // console.log(`[-] ${ip} is not a valid IP address.`);
        }
    }
    catch (_a) {
        // console.log("Please provide a valid IP address")
    }
}
function n2i(num) {
    if (num >= 0 && num <= BigInt(4294967295)) { // 4294967295 is the maximum 255.255.255.255
        var ip_octets = [];
        for (var i = 3; i >= 0; i--) {
            var ip_range = (i << 3); // 0 8 16 24
            var io = num >> ip_range & 0xff; // io=ip octet
            ip_octets.push(String(io));
        }
        var ip = "";
        for (var i = 0; i < 4; i++) {
            ip += ip_octets[i];
            if (i !== 3) {
                ip += ".";
            } // check if the last ip octet is presented then don't add .
        }
        return ip;
    }
    else {
        // console.log("[-] Number can't be smaller than 0 or bigger than 4294967295");
    }
}
function IP2IP(ip1, ip2) {
    var ip1_number = i2n(ip1);
    var ip2_number = i2n(ip2);
    var defr = Number(ip2_number) - Number(ip1_number);
    if (defr >= 0) {
        console.log("[#] ".concat(defr, " IP address between ").concat(ip1, " and ").concat(ip2, "\n"));
        for (var i = Number(ip1_number); i < Number(ip2_number); i++) {
            console.log(n2i(i));
        }
    }
    else {
        console.log("[-] ".concat(ip1, " might be wrong or it's heigher than ").concat(ip2));
    }
}
function run() {
    var args = process_1.argv.slice(2);
    if (args.includes("-i") || args.includes("--ip")) {
        var option = void 0;
        if (args.includes("-i")) {
            option = "-i";
        }
        else {
            option = "--ip";
        }
        var $ips2n = args.slice(args.indexOf(option) + 1);
        if ($ips2n.length > 0) {
            for (var ip = 0; ip < $ips2n.length; ip++) {
                console.log(i2n($ips2n[ip]));
            }
        }
        else {
            console.log("[-] ".concat(option, " must get at least one argument."));
        }
    }
    else if (args.includes("-n") || args.includes("--number")) {
        var option = void 0;
        if (args.includes("-n")) {
            option = "-n";
        }
        else {
            option = "--number";
        }
        var $nums2i = args.slice(args.indexOf(option) + 1);
        if ($nums2i.length > 0) {
            for (var num = 0; num < $nums2i.length; num++) {
                console.log(n2i($nums2i[num]));
            }
        }
        else {
            console.log("[-] ".concat(option, " must get at least one argument."));
        }
    }
    else if (args.includes("-f") || args.includes("--from") && args.includes("-t") || args.includes("--to")) {
        var from_option = void 0;
        var to_option = void 0;
        if (args.includes("-f")) {
            from_option = "-f";
        }
        else {
            from_option = "--from";
        }
        if (args.includes("-t")) {
            to_option = "-t";
        }
        else {
            to_option = "--to";
        }
        var $from = args[args.indexOf(from_option) + 1];
        var $to = args[args.indexOf(to_option) + 1];
        if ($from && args.includes("-f") || args.includes("--from")) {
            if ($to && args.includes("-t") || args.includes("--to")) {
                IP2IP($from, $to);
            }
            else {
                console.log("[-] Provide a to IP address");
            }
        }
        else {
            console.log("[-] Provide a from IP address");
        }
    }
    else if (args.includes("-h") || args.includes("--help")) {
        console.log("*** i2n By @SecVirus ***");
        console.log("Usage:");
        console.log("\t-i/--ip: Convert ip to number.");
        console.log("\t-n/--number: Convert number to ip.\n");
        console.log("\t-h/--help: Show this help message and exit.\n");
        console.log("+ To generate a list of all the ip addresses between two ip addresses:");
        console.log("\t-f/--from: To specify the from range.");
        console.log("\t-t/--to: To specify the to range.");
        console.log("\nAll rights reserved to @SecVirus (forever).");
    }
    else {
        console.log("[!] Rerun with -h/--help flag to show help menu");
    }
}
run();
