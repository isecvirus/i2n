import { argv } from "process";

function i2n(ip) {
    try {
        if (ip.split(".").length === 4) {
            const mx_oct = 0x100; // 0xff=256

            const i1 = +ip.split(".")[0];
            const i2 = +ip.split(".")[1];
            const i3 = +ip.split(".")[2];
            const i4 = +ip.split(".")[3];

            if (i1 <= 255 && i1 >= 0
                && i2 <= 255 && i2 >= 0
                && i3 <= 255 && i3 >= 0
                && i4 <= 255 && i4 >= 0) { // check if every ip octet is not bigger than 255 or smaller than 0
                // o=octet
                // i=ip
                const o1 = mx_oct * (mx_oct * mx_oct) * i1;
                const o2 = (mx_oct * mx_oct) * i2;
                const o3 = mx_oct * i3;
                const o4 = i4;
                let number = Number(o1 + o2 + o3 + o4);

                return number;
            } else {
                // console.log("[-] Maximum IP octet is 255 and only numbers are allowed.")
            }
        } else {
            // console.log(`[-] ${ip} is not a valid IP address.`);
        }
    } catch {
        // console.log("Please provide a valid IP address")
    }
}

function n2i(num) {
    if (num >= 0 && num <= BigInt(4294967295)) { // 4294967295 is the maximum 255.255.255.255
        let ip_octets = [];
        for (var i=3;i>=0;i--) {
            var ip_range = (i << 3); // 0 8 16 24
            var io = num >> ip_range & 0xff; // io=ip octet
            ip_octets.push(String(io));
        }

        let ip = "";
        for (var i=0;i<4;i++){
            ip += ip_octets[i];

            if (i!==3){ip += ".";} // check if the last ip octet is presented then don't add .
        }
        return ip;

    } else {
        // console.log("[-] Number can't be smaller than 0 or bigger than 4294967295");
    }
}

function IP2IP(ip1, ip2) {
    const ip1_number = i2n(ip1);
    const ip2_number = i2n(ip2);
    const defr = Number(ip2_number) - Number(ip1_number);

    if (defr >=0) {
        console.log(`[#] ${defr} IP address between ${ip1} and ${ip2}\n`)

        for (var i=Number(ip1_number);i<Number(ip2_number);i++){
            console.log(n2i(i));
        }
    } else {
        console.log(`[-] ${ip1} might be wrong or it's heigher than ${ip2}`);
    }
}

function run() {
    var args = argv.slice(2);
    
    if (args.includes("-i") || args.includes("--ip")) {
        let option;
        if (args.includes("-i")) {
            option = "-i";
        } else {
            option = "--ip";
        }
        let $ips2n = args.slice(args.indexOf(option) + 1);
        
        if ($ips2n.length > 0) {
            for (var ip=0;ip<$ips2n.length;ip++) {
                console.log(i2n($ips2n[ip]));
            }
        } else {
            console.log(`[-] ${option} must get at least one argument.`);
        }
    } else if (args.includes("-n") || args.includes("--number")) {
        let option;
        if (args.includes("-n")) {
            option = "-n";
        } else {
            option = "--number";
        }

        let $nums2i = args.slice(args.indexOf(option) + 1);
        
        if ($nums2i.length > 0) {
            for (var num=0;num<$nums2i.length;num++) {
                console.log(n2i($nums2i[num]));
            }
        } else {
            console.log(`[-] ${option} must get at least one argument.`);
        }
    } else if (args.includes("-f") || args.includes("--from") && args.includes("-t") || args.includes("--to")) {
        let from_option;
        let to_option;
        if (args.includes("-f")) {
            from_option = "-f";
        } else {
            from_option = "--from";
        }
        if (args.includes("-t")) {
            to_option = "-t";
        } else {
            to_option = "--to";
        }

        let $from = args[args.indexOf(from_option) + 1];
        let $to = args[args.indexOf(to_option) + 1];

        if ($from && args.includes("-f") || args.includes("--from")) {
            if ($to && args.includes("-t") || args.includes("--to")) {
                IP2IP($from, $to);
            } else {
                console.log(`[-] Provide a to IP address`);
            }
        } else {
            console.log(`[-] Provide a from IP address`);
        }
    } else if (args.includes("-h") || args.includes("--help")) {
        console.log("*** i2n By @SecVirus ***");
        console.log("Usage:");
        console.log("\t-i/--ip: Convert ip to number.");
        console.log("\t-n/--number: Convert number to ip.\n");
        console.log("\t-h/--help: Show this help message and exit.\n");
        console.log("+ To generate a list of all the ip addresses between two ip addresses:");
        console.log("\t-f/--from: To specify the from range.");
        console.log("\t-t/--to: To specify the to range.");
        console.log("\nAll rights reserved to @SecVirus (forever).");
    } else {
        console.log(`[!] Rerun with -h/--help flag to show help menu`)
    }
}
run();