# ssh without a password

I do a lot of work that requires me to log in and out of remote machines using <abbr title="Secure Shell">SSH</abbr>.  As a result, I prefer to configure my laptop (working machine) to SSH without prompting for a password on those machines I **know** to be secure.

Here's how to do it.


<!--more-->

## Step 1 - the local machine

From the machine I will be using to connect to the remote machine, I run the following from the command line (within the ~/.ssh/ directory):

`ssh-keygen -t dsa`

Note that I'm using SSH-2 - which if you're using a new Mac will probably be the default.  If you are using SSH-1 you need the command:

`ssh-keygen -t rsa1`

Then I select the default name for the key and leave the pass phrase blank (pressing enter twice).

Now within the ~/.ssh/ directory is a file either called id\_dsa.pub or identity.pub (depending on the version of SSH you are using).

Keep note of this file, we'll need the contents of it for step 2.

## Step 2 - the remote machine

Log in to the remote machine as you normally would.  Now in ~/.ssh/ you need to add the contents of the .pub file made above to the 'authorized_keys' file in ~/.ssh/ - if it doesn't exist, you need to add it:

In the example below, I've copied the public file across to the remote machine, an I will delete it after I'm done.

`cat id_dsa.pub >> ~/.ssh/authorized_keys`

Finally, on the remote machine you want to access, make sure the authorized_keys file is properly chmod'ed:

`chmod 600 ~/.ssh/authorized_keys`

## Closing up

A word of warning: though it sounds obvious, you can now connect to the remote machine without a password.  

This means if your local machine is compromised, you can assume the remote machine is also.

If this happens, delete the entry in authorized_keys on the remote machine and you've closed that security problem.

You can also use this [technique if you're using CVS](http://developer.apple.com/internet/opensource/cvsoverview.html) and don't want to be prompted for the password all the time.  

I hope that's of help - I know I keep forgetting it so I needed to write it down somewhere!