// lib/widgets/header.dart
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class Header extends StatelessWidget {
  final String? logoUrl;

  const Header({Key? key, this.logoUrl}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Format current date
    String formattedDate = DateFormat('MMMM d, yyyy').format(DateTime.now());
    
    return Padding(
      padding: const EdgeInsets.only(bottom: 24.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          // Logo + Title
          Row(
            children: [
              logoUrl != null
                  ? Image.network(
                      logoUrl!,
                      height: 40,
                    )
                  : Container(
                      height: 40,
                      width: 40,
                      decoration: BoxDecoration(
                        gradient: const LinearGradient(
                          colors: [Colors.blue, Colors.purple],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Center(
                        child: Text(
                          "SS",
                          style: TextStyle(
                              color: Colors.white, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ),
              const SizedBox(width: 12),
              const Text(
                "launch box",
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 1.0,
                ),
              ),
            ],
          ),
          // "Last Updated" Card
          Card(
            elevation: 2,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              child: Text(
                "Last updated: $formattedDate",
                style: const TextStyle(fontSize: 14, color: Colors.grey),
              ),
            ),
          ),
        ],
      ),
    );
  }
}